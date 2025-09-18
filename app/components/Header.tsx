type HeaderProps = {
  name: string;
  description: string;
  location?: string;
};

const Header = ({ name, description, location }: HeaderProps) => {
  return (
    <header className="text-center pr-20 py-10  bg-gray-500/35 w-lvw diagonal-gradient-bg rounded-lg border border-gray-300 shadow-lg backdrop-blur-lg">
      <h1 className="text-8xl">{name}</h1>
      <h2 className="text-2xl">{description}</h2>
      {location && <h3 className="text-lg">Based in {location}</h3>}
    </header>
  );
};

export default Header;
