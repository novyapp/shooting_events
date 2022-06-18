import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import { API_URL } from "@config/index";
import Link from "next/link";

export default function EvantsPage({events, page}) {
  const total = events.meta.pagination.total -1

  return (
    <Layout>
      <h1>Competitions</h1>
      {events.data.length === 0 && <h3>No events found</h3>}
      {events.data.map(evt => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {page < total && (
        <Link href={`/events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  
  const PER_PAGE = 2
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  //Fetch events
  const eventRes = await fetch(`${API_URL}/api/events?sort=createdAt%3Adesc&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=%2A`);
  const events = await eventRes.json();

  return {
    props: {
      events: events, 
      page: +page
    },
  }
}
