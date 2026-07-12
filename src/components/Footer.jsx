const Footer = () => (
  <footer className="text-center">
    <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
    <span className="block text-sm pb-4 text-gray-500">
      © {new Date().getFullYear()}{" "}
      <a
        href="https://github.com/MurielSalbador"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Muriel Salbador
      </a>
      . Todos los derechos reservados.
    </span>
  </footer>
);

export default Footer;
