import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import Link from "next/link";
import { API_URL } from "@config/index";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Competitions</h1>
      {events.lenght === 0 && <h3>No events found</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View all</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events:events.slice(0, 3), 
      revalidate: 1,},
    }
}
