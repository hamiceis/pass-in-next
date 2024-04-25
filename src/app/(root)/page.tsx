
import { Header } from "./_components/header";
import { AttendeeList } from "./_components/attendee-list";


export default function Home() {
  return (
    <div className="max-w-[1216px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <AttendeeList />
    </div>
  );
}
