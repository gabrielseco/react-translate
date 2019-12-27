import parse from 'html-react-parser';

interface TransProps {
  translation: string;
  children: React.ReactNode;
}

const Trans = ({ translation, children }: TransProps): any => {
  return translation ? parse(translation) : children;
};

export default Trans;
