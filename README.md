# Flask-Based-Portfolio

# 🌐 Personal Portfolio Website (Flask + Vanilla JS)

This is a professional **personal portfolio website** built with **Flask**, **SQLAlchemy**, and **Vanilla JavaScript**. It includes smooth navigation using `history.pushState` and a dynamic single-page layout powered by HTML5 and CSS3. The contact form saves submissions to a PostgreSQL database and sends email notifications using Flask-Mail.

---

## 🚀 Features

- ✅ Built with **Flask** + **SQLAlchemy**
- ⚙️ Clean, modular database model using Flask's ORM
- 🧠 Seamless page transitions with `history.pushState` (Single Page Navigation)
- 📬 Contact form:
  - Saves data to **PostgreSQL**
  - Sends email notifications using **Flask-Mail**
- 🛡️ Secure credentials using `.env` and environment variables
- 📦 Fully ready for **automatic deployment** via **GitHub + Railway**
- 🌐 Frontend powered by **HTML5**, **CSS3**, and **Vanilla JavaScript**

---

## 🧾 Tech Stack

| Layer       | Tech                            |
|-------------|---------------------------------|
| Backend     | Flask 3.1.2, Flask-Mail 0.10.0, Flask-CORS 6.0.1, Flask-SQLAlchemy 3.1.1   |
| Frontend    | HTML5, CSS3, Vanilla JavaScript, Bootstrap |
| Database    | PostgreSQL (via SQLAlchemy 2.0.44)                           |
| Deployment  | Railway/Vercel + GitHub Integration, Gunicorn 23.0.0     |
| Environment | Python 3.x, python-dotenv 1.1.1     |

📚 **For detailed information about the tech stack, see [TECH_STACK.md](TECH_STACK.md)**

---

## 📁 Project Structure
. ├── app.py ├── database.py ├── models/ │ └── contacts.py ├── static/ │ ├── css/ │ └── js/ ├── templates/ │ └── partials/ │ ├── layout.html │ └── [section].html ├── .env ├──ProcFile ├── requirements.txt └── README.md


---

## ⚙️ Environment Variables (`.env`)

Create a `.env` file in the root with the following keys:

```env
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password   # Use Gmail App Password if 2FA is enabled
SECRET_KEY=your_secret_key
DATABASE_URL=your_database_url

