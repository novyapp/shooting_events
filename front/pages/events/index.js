import Layout from "@components/Layout";
import EventItem from "@components/EventItem";
import { API_URL } from "@config/index";

export default function EvantsPage({events}) {
  return (
    <Layout>
      <h1>Competitions</h1>
      {events.lenght === 0 && <h3>No events found</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();


  return {
    props: {
      events: events,
      revalidate: 1,
    },
    
  }
  
}
