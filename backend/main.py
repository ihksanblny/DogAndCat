import os
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision import models
import io


# Inisialisasi FastAPI
app = FastAPI()

# CORS agar bisa diakses dari frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ganti dengan domain spesifik kalau produksi
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tambahan endpoint root untuk cek app jalan
@app.get("/")
async def root():
    return {"message": "API is running!"}

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Transformasi gambar (harus sama seperti saat validasi)
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# Load model
model = models.resnet18(pretrained=False)
num_ftrs = model.fc.in_features
model.fc = torch.nn.Sequential(
    torch.nn.Dropout(p=0.5),
    torch.nn.Linear(num_ftrs, 2)  # Ganti `2` sesuai jumlah kelas kamu
)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "best_model.pth")
model.load_state_dict(torch.load(model_path, map_location=device))
model.eval()
model.to(device)

# Label mapping (urut sesuai `ImageFolder`)
class_names = ['cat', 'dog']  # Ganti sesuai urutan folder kamu

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Transform
        input_tensor = transform(image).unsqueeze(0).to(device)

        # Prediksi
        with torch.no_grad():
            outputs = model(input_tensor)
            _, predicted = torch.max(outputs, 1)
            class_name = class_names[predicted.item()]
            confidence = torch.nn.functional.softmax(outputs, dim=1)[0][predicted.item()].item()

        return {"prediction": class_name, "confidence": f"{confidence:.2f}"}

    except Exception as e:
        return {"error": str(e)}
