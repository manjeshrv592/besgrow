"use client";

import { useCallback, useEffect } from "react";
import { ObjectInputProps, set, useFormValue } from "sanity";
import { Stack, TextInput, Text, Card, Grid, Box, Label } from "@sanity/ui";

/**
 * Extract lat/lng from a Google Maps URL.
 */
function extractCoordsFromGoogleMapsUrl(
  url: string
): { lat: number; lng: number } | null {
  if (!url) return null;

  // Pattern 1: @lat,lng,zoom or @lat,lng
  const atPattern = /@(-?\d+\.?\d*),(-?\d+\.?\d*)/;
  const atMatch = url.match(atPattern);
  if (atMatch) {
    return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
  }

  // Pattern 2: ?q=lat,lng
  const qPattern = /[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
  const qMatch = url.match(qPattern);
  if (qMatch) {
    return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) };
  }

  // Pattern 3: ?ll=lat,lng
  const llPattern = /[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/;
  const llMatch = url.match(llPattern);
  if (llMatch) {
    return { lat: parseFloat(llMatch[1]), lng: parseFloat(llMatch[2]) };
  }

  // Pattern 4: place coordinates in data parameter
  const placePattern = /!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/;
  const placeMatch = url.match(placePattern);
  if (placeMatch) {
    return { lat: parseFloat(placeMatch[1]), lng: parseFloat(placeMatch[2]) };
  }

  return null;
}

/**
 * Custom input for the distributor entry object that auto-extracts
 * coordinates from the Google Maps link field.
 */
export function DistributorEntryInput(props: ObjectInputProps) {
  const { onChange, value, renderDefault } = props;

  const googleMapsLink = (value as any)?.googleMapsLink || "";
  const currentLat = (value as any)?.coordinates?.lat;
  const currentLng = (value as any)?.coordinates?.lng;

  // Auto-extract coordinates when googleMapsLink changes
  useEffect(() => {
    if (!googleMapsLink) return;

    const extracted = extractCoordsFromGoogleMapsUrl(googleMapsLink);
    if (extracted) {
      // Only update if coordinates are different or not set
      if (extracted.lat !== currentLat || extracted.lng !== currentLng) {
        onChange([
          set(extracted.lat, ["coordinates", "lat"]),
          set(extracted.lng, ["coordinates", "lng"]),
        ]);
      }
    }
  }, [googleMapsLink, currentLat, currentLng, onChange]);

  return renderDefault(props);
}
