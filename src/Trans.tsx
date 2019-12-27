import ReactHtmlParser from 'react-html-parser';

interface TransProps {
  translation: string;
  children: React.ReactNode;
}

const Trans = ({ translation, children }: TransProps): any => {
  return translation ? ReactHtmlParser(translation) : children;
};

export default Trans;
