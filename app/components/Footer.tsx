import Link from 'next/link';
type FooterProps = {
  showNav: boolean;
};

const Footer = ({ showNav = false }: FooterProps) => {
  return (
    <footer className="">
      {showNav && (
        <ul className="inline">
          <li>
            <Link href={`/development`}>Development</Link>
          </li>
          <li>
            <Link href={`/documentary`}>Documentary</Link>
          </li>
          <li>
            <Link href={`/film`}>Film</Link>
          </li>
          <li>
            <Link href={`/live`}>Live</Link>
          </li>
        </ul>
      )}
      &copy; 2024 Chris Kirkham
    </footer>
  );
};

export default Footer;
