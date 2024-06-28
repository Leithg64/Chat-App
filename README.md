Chat-App
Welcome to the Chat-App repository! This application is a real-time chat platform built with Flask for the backend and Socket.IO for real-time communication. It allows users to join chat rooms and exchange messages instantly.

Features
Real-time Messaging: Instant communication through WebSockets using Socket.IO.
User Authentication: Secure login system to authenticate users.
Chat Rooms: Join existing chat rooms or create new ones.
Responsive Design: User-friendly interface that works on both desktop and mobile devices.
Message History: Persistent message storage to keep chat history.
Technologies Used
Backend: Flask, Flask-SocketIO
Frontend: HTML, CSS, JavaScript
Database: SQLite
WebSockets: Socket.IO
Installation
Follow these steps to set up the Chat-App on your local machine:

Prerequisites
Python 3.7 or higher
Node.js and npm (for installing frontend dependencies)
Clone the Repository
bash
Copy code
git clone https://github.com/Leithg64/Chat-App.git
cd Chat-App
Set Up the Virtual Environment
Create and activate a virtual environment:

bash
Copy code
python3 -m venv venv
source venv/bin/activate # On Windows use `venv\Scripts\activate`
Install Dependencies
Install the required Python packages:

bash
Copy code
pip install -r requirements.txt
Set Up the Database
Initialize the SQLite database:

bash
Copy code
flask db init
flask db migrate -m "Initial migration."
flask db upgrade
Run the Application
Start the Flask development server:

bash
Copy code
flask run
Open your web browser and navigate to http://127.0.0.1:5000 to see the Chat-App in action.

Usage
Register for a new account or log in with your existing credentials.
Create a new chat room or join an existing one.
Start sending messages in real-time!

If you have any questions, feel free to reach out to the repository owner at leithgwrk22@gmail.com.
