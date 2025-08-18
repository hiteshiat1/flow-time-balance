import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link to="/auth">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <h3 className="font-semibold mb-2">Personal Information</h3>
            <p className="mb-3">
              When you register for MeTime, we collect information such as your email address, name, and any profile information you choose to provide.
            </p>
            <h3 className="font-semibold mb-2">Usage Data</h3>
            <p className="mb-3">
              We collect information about how you use our Service, including your wellness activities, progress data, and interaction patterns with the application.
            </p>
            <h3 className="font-semibold mb-2">Device Information</h3>
            <p>
              We may collect information about the device you use to access our Service, including hardware model, operating system, and browser type.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Provide, maintain, and improve our Service</li>
              <li>Personalize your wellness recommendations</li>
              <li>Track your progress and provide insights</li>
              <li>Send you updates and notifications (with your consent)</li>
              <li>Respond to your comments and questions</li>
              <li>Ensure the security and integrity of our Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
            <p className="mb-3">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this Privacy Policy.
            </p>
            <p>We may share your information in the following circumstances:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and the safety of our users</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to improve your experience with our Service. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">8. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@metime-app.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;