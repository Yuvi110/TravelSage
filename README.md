
<h1>TravelSage</h1>
![image](https://github.com/Yuvi110/TravelSage/assets/109853694/9b321954-7596-4d5c-b9ec-d28bd08e871e)

<h1>Introduction</h1>
An admin-facing solution designed to streamline the management of rooms in a hotel. This web application provides a comprehensive set of features to help hotel administrators efficiently handle room bookings, pricing, and guest interactions. With a user-friendly interface, the system offers a seamless experience for hotel staff, ensuring that rooms are booked and managed with ease.

<h1>Key Features</h1>
•Room Types and Pricing: The system supports multiple room types, each with its pricing structure. For example, Room Type A may cost 100 Rs per hour, while Room Type B costs 80 Rs per hour, and Room Type C is priced at 50 Rs per hour.

•Booking Management: Admins can easily book rooms for users, specifying the user's email, room number, start time, and end time. The system calculates the booking price based on these details, and it updates in real-time as any of the room number, start time, or end time is modified.

•Overlap Prevention: The application ensures that no two bookings can have overlapping start and end times for the same room, preventing conflicts.

•Edit Bookings: Admins have the capability to edit booking details, including user email, room number, start time, and end time. The system provides confirmation on the updated price.

•Cancellation Policy: Admins can cancel future bookings based on a flexible cancellation policy. If the booking start time is more than 48 hours away, a complete refund is shown. If it's within 24 to 48 hours, a 50% refund is displayed, and for bookings within 24 hours, no refund is shown (though the admin can still cancel the booking).

•View Bookings: The application offers a view page, allowing admins to see both upcoming and past bookings. Filters are available to sort bookings by room number, room type, start time, and end time.

•Email Notifications: The system can send email notifications to users with their booking details, including the correct email, room number, start time, and end time.
<h1>Technologies Used</h1>
This project was created using the following technologies.

<h5>Client</h5>
React JS
Redux (for managing and centralizing application state)
React-router-dom (To handle routing)
Axios (for making api calls)
Bootstrap (for User Interface)
React Charts (to display bookings)

<h5>Server</h5>
Express
Mongoose
Brevo(for sending invoice via email)
html-pdf (for generating invoice PDFs)
<h5>Database</h5>
MongoDB (MongoDB Atlas)

<h1>Configuration</h1>
In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

•Open the project in your prefered code editor.

•Go to terminal -> New terminal (If you are using VS code)

```console
$ cd client
$ npm install (to install client-side dependencies)
$ npm run dev(to start the client)
```


