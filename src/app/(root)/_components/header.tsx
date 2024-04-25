import Image from "next/image";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    
      <div className="flex items-center gap-5 py-2">
        <Image
          src="/nlw-unite-icon.svg"
          width={32}
          height={32}
          alt="Logo da NLW Unite"
        />

        <nav className="flex items-center gap-5">
         <NavLink href="/events">Eventos</NavLink>
         <NavLink href="/attendees">Participantes</NavLink>
        </nav>
      </div>
  );
}
