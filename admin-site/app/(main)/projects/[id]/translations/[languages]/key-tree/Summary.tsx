"use client";

type Props = {
  pathSegment: string;
  absolutePath: string;
};

const Summary = ({ pathSegment, absolutePath }: Props) => {
  const handleClick = () => {
    console.log(absolutePath);
  };

  return (
    <summary onClick={handleClick}>
      {pathSegment} ({absolutePath})
    </summary>
  );
};

export default Summary;
