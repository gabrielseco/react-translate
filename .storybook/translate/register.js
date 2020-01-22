import React from 'react';
import { TranslateProvider, TranslateContext } from './../../dist/index.es';
import { addons, types, makeDecorator } from '@storybook/addons';
import { useParameter, useAddonState, useChannel } from '@storybook/api';
import { AddonPanel, Form } from '@storybook/components';

const ADDON_ID = 'react-translate';
const PANEL_ID = `${ADDON_ID}/panel`;

const ReactTranslatePanel = () => {
  const [languages, setLanguages] = React.useState([]);
  const [language, setLanguage] = React.useState('');
  const emit = useChannel({
    'reactTranslate/options': ({languages}) => {
      setLanguages(languages);
      setLanguage(language[0]);
    },
  });

  const handleChange = (evt) => {
    setLanguage(evt.target.value);
    emit('reactTranslate/language', evt.target.value);
  }

  if(languages.length === 0) {
    return null;
  }
  return (
      <Form>
        <Form.Field label="Language">
            <Form.Select value={language} name="language" onChange={handleChange} size="flex">
              {languages.map(languageOption => (
                <option key={languageOption} value={languageOption}>
                  {languageOption}
                </option>
              ))}
            </Form.Select>
          </Form.Field>
      </Form>
  )
}


addons.register(ADDON_ID, api => {
  const render = ({ active, key }) => (
    <AddonPanel active={active} key={key}>
      <ReactTranslatePanel />
    </AddonPanel>
  );
  const title = 'React Translate';

  addons.add(PANEL_ID, {
    type: types.PANEL,
    title,
    render,
  });
});

export default makeDecorator({
  name: 'withReactTranslate',
  parameterName: 'reactTranslate',
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context, { options, parameters }) => {
    const { languages } = options;
    const channel = addons.getChannel();
    const [language, setLanguage] = React.useState(options.language);
    channel.emit('reactTranslate/options', options);
    channel.on('reactTranslate/language', (observedLanguage) => {
      setLanguage(observedLanguage)
    })

    const providerValue = {
      fallbackLng: options.fallbackLng,
      languages: options.languages,
      language: language,
      translations: options.translations,
    }
    return (
      <TranslateProvider value={providerValue}>
        {getStory(context)}
      </TranslateProvider>
    );
  }
})