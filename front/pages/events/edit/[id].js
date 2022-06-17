import moment from "moment";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@components/Layout";
import Modal from "@components/Modal";
import ImageUpload from "@components/ImageUpload";
import { API_URL } from "@config/index";
import classes from "@styles/Form.module.css";

export default function EditEventPage({ evt }) {
  console.log(evt);
  const [values, setValues] = useState({
    title: evt.data.attributes.title,
    host: evt.data.attributes.host,
    address: evt.data.attributes.address,
    date: evt.data.attributes.date,
    time: evt.data.attributes.time,
    description: evt.data.attributes.description,
    price: evt.data.attributes.price,
    entry: evt.data.attributes.entry,
  });
  const [imagePreview, setImagePreview] = useState(
    evt.data.attributes.cover
      ? evt.data.attributes.cover.data.attributes.url
      : null
  );
  
  console.log(imagePreview)
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const res = await fetch(`${API_URL}/api/events/${evt.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: values,
      }),
    });
    console.log(values);

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("Unauthorized");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(`${API_URL}/api/events/${evt.data.id}?populate=%2A`)
    const data = await res.json()
    console.log(data)
    setImagePreview(evt.data.attributes.cover.data.attributes.url)
    setShowModal(false)
    setShowModal(false);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />
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
              value={moment(values.date).format("yyyy-MM-DD")}
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
        <input type="submit" value="Edit Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-secondary btn-icon"
        >
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.data.id} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=%2A&`);
  const evt = await res.json();

  return {
    props: {
      evt,
    },
  };
}
