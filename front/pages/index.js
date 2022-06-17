import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import Link from "next/link";
import { API_URL } from "@config/index";
import { qs } from "qs"

export default function Home({ events }) {
  console.log(events)
  return (
    <Layout>
      
      <h1>Upcoming Competitions</h1>
      {events.data.length === 0 && <h3>No events found</h3>}
      {events.data.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.data.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View all</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
    const query = qs.stringify({
      sort: ['title:asc', 'slug:desc'],
    }, {
      encodeValuesOnly: true,
    });

  const res = await fetch(`${API_URL}/api/events?pagination[pageSize]=2&populate=%2A`);
  const events = await res.json();
  

  return {
    props: { events, 
      revalidate: 1},
    }
}
