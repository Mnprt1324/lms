import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export const Accodian = () => {
  return (
    <div className="py-12 px-6 bg-gray-50">
      {/* Heading */}
      <div className="flex flex-col items-center text-center gap-3 mb-10">
        <h1 className="font-semibold text-3xl">Frequently Asked Questions</h1>
        <div className="w-[120px] h-1 bg-blue-500 rounded-full" />
        <p className="max-w-2xl text-gray-600 dark:text-gray-300">
          Find answers to common questions from students and instructors.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student FAQs */}
        <div className="rounded-lg p-6 shadow-sm border bg-white ">
          <h2 className="font-semibold text-2xl  underline decoration-blue-500 mb-6">Student</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="s1">
              <AccordionTrigger>How do I enroll in a course?</AccordionTrigger>
              <AccordionContent>
                You can enroll by visiting the course page and clicking the “Enroll Now” button.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="s2">
              <AccordionTrigger>Do I get a certificate after completion?</AccordionTrigger>
              <AccordionContent>
                Yes, certificates are available for most courses after successful completion.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="s3">
              <AccordionTrigger>Can I access the course materials offline?</AccordionTrigger>
              <AccordionContent>
                Currently, offline access is not available. You’ll need an internet connection to view content.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Instructor FAQs */}
        <div className=" rounded-lg p-6 shadow-sm border bg-white">
          <h2 className="font-semibold text-2xl mb-6 underline decoration-blue-500">Instructor</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="i1">
              <AccordionTrigger>How do I become an instructor?</AccordionTrigger>
              <AccordionContent>
                Simply fill out the instructor application form, and our team will review it within 3–5 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="i2">
              <AccordionTrigger>Can I publish multiple courses?</AccordionTrigger>
              <AccordionContent>
                Absolutely! You can publish as many high-quality courses as you'd like.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="i3">
              <AccordionTrigger>What percentage of revenue do instructors earn?</AccordionTrigger>
              <AccordionContent>
                Instructors earn up to 70% revenue share, depending on the source of the sale.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
