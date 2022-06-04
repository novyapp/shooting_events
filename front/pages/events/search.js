import Layout from "@components/Layout";
import { useRouter } from "next/router";
import EventItem from "@components/EventItem";
import { API_URL } from "@config/index";
import Link from "next/link";

export default function SearchPage({events}) {
  const  router = useRouter();
  return (
    <Layout title="Search Resoults">
        <Link href="/events">Go Back</Link>
      <h1>Search Resoults: {router.query.term}</h1>
      {events.data.length === 0 && <h3>No events found</h3>}
      {events.data.map(evt => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  );
}

export async function getServerSideProps({query: 
{term}}) {
  const res = await fetch(`${API_URL}/api/events?filters[$or][0][title][$contains]=${term}&filters[$or][1][description][$contains]=${term}&populate=%2A`);
  const events = await res.json();


  return {
    props: {
      events: events,
    },
    
  }
  
}
