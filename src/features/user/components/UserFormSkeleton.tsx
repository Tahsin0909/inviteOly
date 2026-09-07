import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

export const UserFormSkeleton = () => {
  const Row = ({ children }: { children: ReactNode }) => (
    <div className="grid grid-cols-12 gap-4">{children}</div>
  );

  const Col = ({ children }: { children: ReactNode }) => (
    <div className="col-span-6 space-y-2">{children}</div>
  );

  return (
    <div className="space-y-5 py-5" aria-hidden>
      {/* First Row */}
      <Row>
        <Col>
          <Skeleton className="h-5 w-1/3 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>

        <Col>
          <Skeleton className="h-5 w-1/3 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>
      </Row>

      {/* Email + Company Name */}
      <Row>
        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>

        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>
      </Row>

      {/* Job Title + Job Function */}
      <Row>
        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>

        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>
      </Row>

      {/* Country + Job Level (select) */}
      <Row>
        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>

        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>
      </Row>

      {/* Industry + Company Size */}
      <Row>
        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>

        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>
      </Row>

      {/* Postal Code + Phone */}
      <Row>
        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>

        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>
      </Row>

      {/* Role + Active Status */}
      <Row>
        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>

        <Col>
          <Skeleton className="h-5 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </Col>
      </Row>

      {/* Submit Button */}
      <div className="pt-2">
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
    </div>
  );
};
