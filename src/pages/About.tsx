import { Component } from 'solid-js';

const AboutPage: Component = () => {
  return (
    <main class='container mx-auto px-2 prose'>
      <h2>Welcome to the WL Pick Helper</h2>
      <p>
        Utilize this tool to help you make your WL Picks. It utilizes the (unofficial) ESPN API and simple data storage to track your picks and
        present you with odds and matchups.
      </p>
      <p>Use the Hamburger menu at the top left for quick navigation or use these links:</p>
      <ul>
        <li>Previous Picks</li>
        <li>Current Standings</li>
        <li>Schedule</li>
      </ul>
    </main>
  );
};

export default AboutPage;
