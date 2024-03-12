const Course = ({ course }) => {
  return (
    <>
      <CourseHeader text={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const CourseHeader = ({ text }) => <h2>{text}</h2>;

const Content = ({ parts }) => {
  const initialValue = 0;
  const total = parts.reduce((sum, part) => sum + part.exercises, initialValue);
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <div>
        <p>
          <b>total of {total} exercises</b>
        </p>
      </div>
    </>
  );
};

const Part = ({ name, exercises }) => (
  <div>
    <p>
      {name} {exercises}
    </p>
  </div>
);

export default Course;
