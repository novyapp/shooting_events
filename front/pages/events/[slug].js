import Layout from "@components/Layout";
import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@config/index";
import { useRouter } from "next/router";
import classes from "@styles/Event.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EventPage({ evt }) {
  console.log(evt)
  const router = useRouter();

  const deleteEvent = async (e) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/api/events/${evt.data[0].id}`, {
        method: 'DELETE'
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.message)
      } else {
        router.push('/events/')
      }
    }
  };

  return (
    <Layout>
      <div className={classes.event}>
        <div className={classes.controls}>
          <Link href={`/events/edit/${evt.data[0].id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={classes.delete} onClick={deleteEvent}>
            <FaTimes />
            Delete Event
          </a>
        </div>
        <span>
        {new Date(evt.data[0].attributes.date).toLocaleDateString('pl-PL')} at {evt.data[0].attributes.time}
        </span>
        <h1>{evt.data[0].attributes.title}</h1>
        <ToastContainer />
        {evt.data[0].attributes && (
          <div className={classes.image}>
            <Image
              src={evt.data[0].attributes.cover.data.attributes.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Sponsors:</h3>
        <p>{evt.data[0].attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.data[0].attributes.description}</p>
        <h3>Venue: {evt.data[0].attributes.venue}</h3>
        <p>{evt.data[0].attributes.address}</p>

        <Link href='/events'>
            <a className={classes.back}>
                {'<'} Go back</a>
        </Link>
        
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=%2A`);
  const events = await res.json();

  const paths = events.data.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  console.log(slug);
  const res = await fetch(`${API_URL}/api/events?populate=%2A&filters[slug]=${slug}`);
  const events = await res.json();

  return {
    props: {
      evt: events,
    },
    revalidate: 1,
  };
}
