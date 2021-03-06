import Layout from "@components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@config/index";
import classes from "@styles/form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function AddEvent() {
  const [values, setValues] = useState({
      title: "",
      host: "",
      address: "",
      date: "",
      time: "",
      description: "",
      price: "",
      entry: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validation

    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyFields) {
      toast.error("Please fill up everything");
    }

    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
            'title': values.title,
            'host': values.host,
            'address': values.address,
            'date': values.date,
            'time': values.time,
            'description': values.description,
            'price': values.price,
            'entry': values.entry

          },
      }),
    });
    console.log(values);

    if (!res.ok) {
      toast.error("Something went wrong");
    } else {
      const evt = await res.json();
       router.push(`/events/`)
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add New Event</h1>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.grid}>
          <div>
            <label htmlFor="title">Event host</label>
            <input
              type="text"
              id="host"
              name="host"
              value={values.host}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="title">Event address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="title">Event date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="title">Event time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="title">Event price</label>
            <input
              type="number"
              step=".01"
              id="price"
              name="price"
              value={values.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="title">Event entry</label>
            <input
              type="text"
              id="entry"
              name="entry"
              value={values.entry}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}
