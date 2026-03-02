**Deployment Link** : https://my-health-mate-cqzg-45pupanlc-amishkumarjhas-projects.vercel.app?_vercel_share=HbAkFqIupxNVCDdSPJtWi4KX0wMSWefw

# 🩺 My Health Mate

A full-stack health assistant application built using **Next.js (Frontend)** and **Flask (Backend)** with Machine Learning integration.

---

##  Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- Flask
- Python
- Scikit-learn (ML Model)

---

## 📁 Project Structure

```
MY_HEALTH_MATE/
│
├── Backend/
│   ├── app.py
│   ├── models/
│   │   └── (ML model files)
│   ├── requirements.txt
│
├── Frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│
├── .gitignore
└── README.md
```

---

# ⚙️ Setup Instructions

---

## 🔹 1: Clone the Repository

```bash
git clone https://github.com/AmishKumarJha/My_Health_Mate.git
cd My_Health_Mate
```

---

# 🖥️ Running the Backend (Flask API)

## 📌 Step 1: Navigate to Backend Folder

```bash
cd Backend
```

## 📌 Step 2: Create Virtual Environment (Recommended)

```bash
python -m venv venv
```

Activate it:

### Mac/Linux:
```bash
source venv/bin/activate
```

### Windows:
```bash
venv\Scripts\activate
```

## 📌 Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` is not available:

```bash
pip install flask scikit-learn pandas numpy
```

## 📌 Step 4: Run Backend Server

```bash
python app.py
```

Backend will run on:

```
http://127.0.0.1:5000
```

---

# 🌐 Running the Frontend (Next.js)

## 📌 Step 1: Open New Terminal & Navigate to Frontend Folder

```bash
cd Frontend
```

## 📌 Step 2: Install Dependencies

```bash
npm install
```

## 📌 Step 3: Start Development Server

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:3000
```

---

# 🔗 Connecting Frontend to Backend

Ensure your frontend API calls point to:

```
http://127.0.0.1:5000
```

If required, configure the API base URL inside your frontend environment file.

---

# 🧠 Machine Learning Model

- The backend loads the trained ML model from the `models/` directory.
- Large model files are not pushed to GitHub.
- Ensure the model files are present locally before running the backend.

---

# 🛠️ Requirements

- Python 3.8+
- Node.js 18+
- npm or yarn

---

# 👨‍💻 Author

**Amish Kumar Jha**  
B.Tech CSE  
Full-Stack & ML Enthusiast 

---

# ⭐ Future Improvements

- Authentication system
- Docker support
- CI/CD integration
