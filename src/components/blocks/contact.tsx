"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail } from "lucide-react";

interface ContactProps {
  title?: string;
  subtitle?: string;
  showForm?: boolean;
  address?: string;
  phone?: string;
  email?: string;
}

export function ContactBlock({
  title = "",
  subtitle,
  showForm = true,
  address,
  phone,
  email,
}: ContactProps) {
  return (
    <section className="py-20 lg:py-32 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-medium text-gray-900 mb-6">
                Contact Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We&apos;d love to hear from you. Reach out to us through any of
                the following channels or fill out the contact form.
              </p>
            </div>

            <div className="space-y-6">
              {address && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Address
                    </h4>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
              )}

              {phone && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Phone
                    </h4>
                    <p className="text-gray-600">{phone}</p>
                  </div>
                </div>
              )}

              {email && (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      Email
                    </h4>
                    <p className="text-gray-600">{email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          {showForm && (
            <div className="bg-white rounded-2xl p-8 shadow-soft">
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 234 567 890" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
