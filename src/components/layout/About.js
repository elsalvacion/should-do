import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "Should Do - About";
  }, []);
  return (
    <div className="container about">
      <h3 className="center">Why Should do?</h3>
      <blockquote>
        You cannot change what happenned yesterday but we can work on today and
        plan for tomorrow. - STEPS
      </blockquote>

      <p>
        This why in ShouldDo you can only add TO-DO's for today and tomorrow and
        you cannot edit, manipulate or delate your history.
      </p>
    </div>
  );
};

export default About;
