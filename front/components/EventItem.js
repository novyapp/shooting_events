import Link from "next/link";
import Image from "next/image";
import classes from "./EventItem.module.css";

export default function EventItem({ evt }) {
  console.log(evt)

  const { time, date, title, slug} = evt.attributes


  return (
    <div className={classes.event}>
      <div className={classes.img}>
          <div className={classes.image}>
            <Image
              src={evt.attributes.cover.data.attributes.url}



              width={960}
              height={600}
            />
          </div>
      </div>
      <div className={classes.info}>
        <span>
          {new Date(date).toLocaleDateString('pl-PL')} at {time}
        </span>
        <h3>{title}</h3>
      </div>
      <div className={classes.link}>
        <Link href={`/events/${slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
}
