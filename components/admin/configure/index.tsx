import Image from 'next/image';
import styles from './styles.module.scss';
import Eng from '@/public/eng.png';
import ButtonComponent from '../../common/button';
import { useEffect, useState } from 'react';

interface Props {
  options: string[];
  components: { [key: string]: React.ComponentType<any> };
}

const Configure: React.FC<Props> = ({ options, components }) => {
  const [select, setSelect] = useState('');
  const [show, setShow] = useState(true);

  const toggle = () => setShow(!show);

  useEffect(() => {
    if (options && options.length > 0) {
      setSelect(options[0]);
    }
  }, [options]);

  const handleOptionClick = (option: string) => {
    setSelect(option);
    setShow(true);
  };

  const render = () => {
    if (components && select && select in components) {
      const Component = components[select];
      return <Component />;
    }
    return null;
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_eng}>
          <Image src={Eng} alt="Opções" className={styles.eng} onClick={toggle} />
          <div className={`${styles.modal} ${show ? styles.show : ''}`} onClick={toggle}>
            <div className={styles.modal_body}>
              {options.map((option, index) => (
                <ButtonComponent
                  key={index}
                  value={option}
                  onClick={() => handleOptionClick(option)}
                  className={styles.btn}
                />
              ))}
            </div>
          </div>
        </div>

        {render()}
      </div>
    </>
  );
};

export default Configure;
