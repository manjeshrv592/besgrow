import Container from "@/components/layout/Container";
import IconButton from "@/components/ui/IconButton";
import { CiMail } from "react-icons/ci";

const TestingPage = () => {
  return (
    <Container>
      <div className="flex flex-col items-start gap-8 py-32">
        {/* As a button */}
        <IconButton
          icon={
            <CiMail
              className="translate-y-0.5 lg:translate-none lg:text-white"
              strokeWidth={1}
            />
          }
        >
          Click Me!
        </IconButton>

        {/* As a Link */}
        <IconButton
          href="/"
          icon={
            <CiMail
              className="translate-y-0.5 lg:translate-none lg:text-white"
              strokeWidth={1}
            />
          }
        >
          Go Somewhere
        </IconButton>
      </div>
    </Container>
  );
};

export default TestingPage;
