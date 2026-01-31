"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string; subject?: string; message?: string } = {};
    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";
    if (!subject) newErrors.subject = "Subject is required.";
    if (!message) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    // In a real application, you would handle the actual contact form submission here
    console.log("Contact form submitted:", { name, email, subject, message });
    alert("Message sent successfully! (Mock)");
    // Optionally reset form fields
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600 dark:text-gray-400">
            We'd love to hear from you! Send us a message or find our contact details below.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <Card className="p-6 space-y-6">
            <CardHeader className="p-0">
              <CardTitle className="text-xl">Our Information</CardTitle>
              <CardDescription>Reach out to us through our direct channels.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <p>123 Main Street, Anytown, USA 12345</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <p>info@example.com</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="p-6 space-y-6">
            <CardHeader className="p-0">
              <CardTitle className="text-xl">Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="Subject of your message"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                  {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

