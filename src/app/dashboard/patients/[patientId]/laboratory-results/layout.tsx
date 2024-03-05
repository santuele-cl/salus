import { Suspense } from "react";

const LoadingUI = () => {
  return <h1>Loading</h1>;
};

const LaboratoryResultsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Suspense fallback={<LoadingUI />}>{children}</Suspense>
    </div>
  );
};
export default LaboratoryResultsLayout;
