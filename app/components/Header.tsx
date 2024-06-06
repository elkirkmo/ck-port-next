type HeaderProps = {
  name: string;
  bio: string;
  location: string;
};

const Header = ({ name, bio, location }: HeaderProps) => {
  return (
    <header className="text-right pr-20 py-10 text-white bg-gray-500/35 w-lvw">
      <h1 className="text-8xl">{name}</h1>
      <h2 className="text-2xl">{bio}</h2>
      <h3 className="text-lg">Based in {location}</h3>
    </header>
  );
};

export default Header;
