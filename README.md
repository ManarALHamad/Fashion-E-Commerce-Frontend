# Ndesigns — Women's Fashion E-Commerce

A full-stack e-commerce web application for a women's fashion brand, built with a React (Vite) frontend and a Django REST Framework backend. Customers can browse products by category, sub-category, and seasonal collections, view detailed product pages with size/price/stock selection, manage a shopping cart and wishlist, and check out. Admins can manage products and process incoming orders through a dedicated dashboard.

> Built as a final project for General Assembly's Software Engineering Immersive.

## Screenshot

<img width="818" height="537" alt="Screenshot 2026-09-01 213848" src="https://github.com/user-attachments/assets/a6c4dcb3-bd7b-48ba-9a32-6552cd435cb3" />

## Live Demo

[PLACEHOLDER: Link to the deployed frontend]

## Planning Materials

[Trello Board Planning](https://trello.com/b/Td061uis/capstone-project%F0%9F%91%97)


### Backend (Django)

[Link to the backend repo](https://github.com/ManarALHamad/Fashion-E-Commerce-Backend)

```bash
cd Fashion-E-Commerce-Backend
python -m venv .venv
source .venv/bin/activate   # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the backend root with your database and secret key configuration:

Run migrations and start the server:

```bash
python manage.py migrate
python manage.py createsuperuser   # to create an admin account
python manage.py runserver
```

The API will be running at `http://localhost:8000`.

### Frontend (React + Vite)

```bash
cd Fashion-E-Commerce-Frontend
npm install
```

Create a `.env` file in the frontend root:

```
VITE_BACK_END_SERVER_URL=http://localhost:8000
```

Start the dev server:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`.

## Technologies & Major Services Used

**Frontend**
- React (with Vite)
- React Router
- lucide-react (icons)

**Backend**
- Django
- Django REST Framework
- Simple JWT (`rest_framework_simplejwt`) for authentication
- PostgreSQL


## Future Enhancements

- Integrate a payment gateway for online payment method.
- Send order confirmation and admin notification emails via SMTP.
- Reserve/decrement stock at checkout to prevent overselling.

## Team

[Manar](https://github.com/ManarALHamad) | [Hawra](https://github.com/IHXI) | [Abdullah](https://github.com/Im-Abdullah26))
