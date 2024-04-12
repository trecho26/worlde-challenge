import Image from "next/image";

type Props = {
  onClick: () => void;
};

const DialogHelpContent = ({ onClick }: Props) => {
  return (
    <>
      <h3 className="font-bold text-3xl text-center">Cómo jugar</h3>
      <p className="my-3">Adivina la palabra oculta en cinco intentos.</p>
      <p className="my-3">
        Cada intento debe ser una palabra válida de 5 letras.
      </p>
      <p className="my-3">
        Después de cada intento el color de las letras cambia para mostrar qué
        tan cerca estás de acertar la palabra.
      </p>
      <p className="font-bold">Ejemplos</p>
      <Image
        src="./example-01.svg"
        alt="Ejemplo de letra en posición correcta"
        width={250}
        height={250}
        className="my-3 mx-auto"
      />
      <p>
        La letra <strong>G</strong> está en la palabra y en la posición
        correcta.
      </p>
      <Image
        src="./example-02.svg"
        alt="Ejemplo de letra que está en la palabra pero en la posición incorrecta"
        width={250}
        height={250}
        className="my-3 mx-auto"
      />
      <p>
        La letra <strong>C</strong> está en la palabra pero en la posición
        incorrecta.
      </p>
      <Image
        src="./example-03.svg"
        alt="Ejemplo de letra que  no está en la palabra"
        width={250}
        height={250}
        className="my-3 mx-auto"
      />
      <p>
        La letra <strong>O</strong> no está en la palabra.
      </p>
      <p className="my-3">
        Puede haber letras repetidas. Las pistas son independientes para cada
        letra.
      </p>
      <p className="my-3 text-center">¡Una palabra nueva cada 5 minutos!</p>
      <div className="flex justify-center">
        <button
          onClick={onClick}
          className="bg-wordGreen text-white font-semibold rounded w-1/2 py-1"
        >
          !JUGAR¡
        </button>
      </div>
    </>
  );
};

export default DialogHelpContent;
