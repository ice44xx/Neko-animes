import styles from '../../styles.module.scss';
import { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import animes_services, { Animes } from '../../../../../services/animes/animes.service';
import InputComponent from '../../../../common/input';
import LabelComponent from '../../../../common/label';
import ButtonComponent from '../../../../common/button';
import SelectInput from '../../../../common/select';
import TextAreaComponent from '../../../../common/textarea';

const AnimesCreate = () => {
  const [animes, setAnimes] = useState<Animes>({
    name: '',
    synopsis: '',
    thumbnailUrl: '',
    feature: true,
    categoryNames: [],
    classificationName: '',
  });

  const handleSubmit = async () => {
    try {
      const res = await animes_services.create(animes);
      alert('Anime criado' + JSON.stringify(res));
    } catch (error: any) {
      alert('Erro ao criar classificação: ' + error.message);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const featureValue = value === 'sim';
    setAnimes((prevAnimes) => ({
      ...prevAnimes,
      feature: featureValue,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(',').map((category) => category.trim());
    setAnimes((prevAnimes) => ({
      ...prevAnimes,
      categoryNames: categories,
    }));
  };

  return (
    <Form className={styles.form} onSubmit={handleSubmit}>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="name" value={'Nome do anime'} />
        <InputComponent
          id="name"
          name="name"
          onChange={(e) => setAnimes({ ...animes, name: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="synopsis" value={'Synopsis'} />
        <TextAreaComponent
          rows={3}
          name="synopsis"
          onChange={(e) => setAnimes({ ...animes, synopsis: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="thumbnailUrl" value={'Thumbnail'} />
        <InputComponent
          id="thumbnailUrl"
          name="thumbnailUrl"
          onChange={(e) => setAnimes({ ...animes, thumbnailUrl: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group_select}>
        <LabelComponent value={'Em destaque ?'} />
        <SelectInput value={animes.feature} onChange={handleSelectChange} />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="classificationName" value={'Classificação'} />
        <InputComponent
          id="classificationName"
          name="classificationName"
          onChange={(e) => setAnimes({ ...animes, classificationName: e.target.value })}
        />
      </FormGroup>
      <FormGroup className={styles.form_group}>
        <LabelComponent htmlFor="categoryNames" value={'Categorias'} />
        <InputComponent id="categoryNames" name="categoryNames" onChange={handleCategoryChange} />
      </FormGroup>
      <ButtonComponent value="Lançar anime" className={styles.btn} />
    </Form>
  );
};

export default AnimesCreate;