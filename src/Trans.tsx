import parse from 'html-react-parser';

interface TransProps {
  translation: string | string[];
  children: React.ReactNode;
}

export const Trans = ({ translation, children }: TransProps): any => {
  const calculateTranslation =
    translation instanceof Array ? translation.join(' ') : translation;

  return calculateTranslation ? parse(calculateTranslation) : children;
};
