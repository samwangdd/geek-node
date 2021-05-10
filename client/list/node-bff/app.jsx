const React = require('react');
const Container = require('../components/container.jsx');

module.exports = function (reactData) {
  return <Container columns={reactData} filt={() => {}} sort={() => {}} />;
};
