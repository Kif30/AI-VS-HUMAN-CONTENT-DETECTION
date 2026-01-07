<div align="center">

<h1>AI vs Human Content Detection</h1>

<p>
A <b>multimodal AI system</b> that determines whether content is <b>AI-generated</b> or <b>human-generated</b> across text, images, and videos.
</p>

<p>
Built with a <b>FastAPI backend</b> for inference and a <b>Next.js frontend</b> for interaction — designed to be clean, scalable, and production-aware.
</p>

</div>

---

## 🚀 What This Project Does

This system analyzes uploaded content and predicts whether it was created by an AI or a human using specialized deep learning models for each modality.

It is designed with:
- clear separation of concerns  
- real-world deployment constraints  
- clean version control practices  

---

## ✨ Core Features

- 📝 **Text detection** (AI vs Human)
- 🖼️ **Image detection** (AI vs Human)
- 🎥 **Video detection** (AI vs Human)
- 🔬 Dedicated deep learning model per modality
- 🔌 RESTful API for inference
- 💻 Modern, responsive web interface
- 🧹 No large files or models committed to GitHub

---

## 🧠 Models Overview

| Modality | Architecture |
|--------|-------------|
| Text | DeBERTa-v3 |
| Image | XceptionNet |
| Video | XceptionNet + TCN |

> Model weights are intentionally **excluded** from this repository.

---

## 🏗️ Technology Stack

### Backend
- Python
- FastAPI
- PyTorch
- Hugging Face Transformers

### Frontend
- Next.js
- React
- TypeScript
- pnpm

---
📦 AI-VS-HUMAN-CONTENT-DETECTION  
│  
├── 🧠 backend/  
│   ├── 🚀 main.py  
│   ├── 🧩 routers/  
│   ├── 🗂️ main models/        # trained model files (not included)  
│   └── 📁 models/  
│  
├── 💻 frontend/ (or code/)  
│   ├── 📱 app/  
│   ├── 🧱 components/  
│   ├── 📦 package.json  
│   └── 🚫 node_modules/      # ignored  
│  
├── ⚙️ .gitignore  
└── 📘 README.md  


---

````md
## ▶️ Running the Project Locally

### Backend Setup

```bash
cd backend
````

```bash
python -m venv venv
```

Activate the virtual environment:

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the API server:

```bash
uvicorn main:app --reload
```

Backend available at:

```
http://127.0.0.1:8000
```

Interactive API docs:

```
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

> Recommended Node version: Node 18 LTS

```bash
cd code    # or frontend
```

```bash
pnpm install
```

```bash
pnpm run dev
```

Frontend available at:

```
http://localhost:3000
```

---

## 📦 Model Files (Required)

Due to GitHub size limits, trained model weights are not included.

### How to Get the Models

Request access via email:

```
your-email@example.com
```

After receiving the files, create this directory:

```bash
backend/main models/
```

Place all model files inside it.

---

## ⚠️ Known Limitations

* Predictions are probabilistic, not absolute
* Accuracy depends on training data quality
* Video analysis is computationally expensive
* Rapid evolution of generative models may reduce reliability

---

## 🧩 Design Philosophy

* Code-first, artifact-second
* Clean Git history
* Reproducible setup
* Realistic ML deployment practices

---

## 👤 Created By

Syed Akif and 
Kashaf Fathima

<div align="center">
<i>Code only. Models on request. Clean by design.</i>
</div>
```
