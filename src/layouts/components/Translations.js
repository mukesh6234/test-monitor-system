// ** Third Party Import
import { SliceName } from "components/helper";
import { useTranslation } from "react-i18next";

const Translations = ({ text }) => {
  // ** Hook
  const { t } = useTranslation();

  return (
    <>      
      <span>{SliceName(`${t(text)}`)}</span>
    </>
  );
};

export default Translations;
