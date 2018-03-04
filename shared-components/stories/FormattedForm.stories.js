import React from 'react';
import { storiesOf } from '@kadira/storybook';
import FormattedForm from '../src/components/FormattedForm';


const stories = storiesOf('FormattedForm', module);
const selectOptions = [
  { value: "head", label: "Use default branch" },
  { value: "branches", label: "Branches" },
  { value: "tags", label: "Tags" },
  { value: "commitId", label: "Commit ID" },
  { value: "ref", label: "Custom Git Ref" },
];

const allDataTypesProp = {
  fieldMatrix: [
    [
      {
        inputType: "input",
        inputOptions: {
          key: "addgitrepo",
          label: "Name",
          sublabel: "optional",
          link: "abc",
          linklabel: "learn more about git repos",
          placeholder: "add a git repo",
          validated: true,
          validators: [
            {
              checker: (value, props, values) => value === "error",
              errorCreator: (value) => "you typed error",
            },
            {
              checker: (value, props, values) => !value,
              errorCreator: (value) => "you typed nothing",
            },
          ],

        },
      },
      {
        inputType: "warning",
        inputOptions: {
          key: "warning",
          content: "This is a warning",
          link: 'link_href',
          linklabel: 'link link',
        },
      }
    ],[
      {
        inputType: "select",
        inputOptions: {
          key: "defaultref",
          label: "Default Reference",
          sublabel: "(optional)",
          link: "abc",
          linklabel: "learn more",
          onValuesUpdate: (value, props, allValues) => ({
            title: value || "Default Reference",
          }),
          options: selectOptions,
        },
      },
      {
        inputType: "input",
        inputOptions: {
          key: "refname",
          onValuesUpdate: (value, props, allValues) => ({
            placeholder: allValues.defaultref ?
              `enter a valid ${allValues.defaultref} element`:
              "",
          }),
        },
      },
    ], [
      {
        inputType: "checkbox",
        inputOptions: {
          label: "Always show commit message",
          sublabel: "(optional)",
          link: "abc",
          linklabel: "learn more",
          key: "showcommitmessage"
        },
      },
      {
        inputType: "text",
        inputOptions: "this is a bunch of text. the quick brown fox jumped over the lazy dog. I am ok at math. Who's that guy over there?",
      },
      {
        inputType: "textarea",
        inputOptions: {
          label: "Commit Message",
          key: "commitmessage",
          sublabel: "(optional)",
          link: "abc",
          linklabel: "learn more",
          placeholder: "enter a commit message here",
          validated: true,
          validators: [
            {
              checker: (value, props, allValues) => allValues.showcommitmessage ? !value : undefined,
              errorCreator: () => "Please enter a commit message",
            },
          ],
        },
      },
    ]
  ],
  csrfToken: 'abc',
  onChange: () => console.log('change'),
  onSubmit: async function(values, cmpProps) {
    console.log('passing submit', values);
  },
  onCancel: () => console.log('cancel'),
  cancelLabel: "Cancel",
  submitLabel: "Submit",
};


stories.add('simple', () => (
  <FormattedForm
    {...allDataTypesProp}
  />
));

const propsWithOnSubmitError = {
  ...allDataTypesProp,
  onSubmit: async function(values, cmpProps) {
    throw new Error('this is an error in onSubmit');
  },
};

stories.add('with on submit error', () => (
  <FormattedForm
    {...propsWithOnSubmitError}
  />
));

const withDefaultValuesProp = {
  ...allDataTypesProp,
  defaultValues: {
    commitmessage: "Commit with this message",
    addgitrepo: "NAMENAME",
    showcommitmessage: true,
  },
};

stories.add('with default values', () => (
  <FormattedForm
    {...withDefaultValuesProp}
  />
));
