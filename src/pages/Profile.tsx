"use client";
import { Menu, Home, Search, PlusSquare, Heart } from "lucide-react";
import { mockProfile } from "../data/user";
import { useEffect, useState } from "react";
import type { Profile } from "../types/user";
import { useUser } from "../hooks/user";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-semibold">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(mockProfile);
  const { getProfile } = useUser();

  useEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile();
      console.log("profileData", profileData);
      setProfile(profileData);
    }
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-white">
      <div className="mx-auto h-full bg-white shadow-sm overflow-hidden">
        {/* Top area */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-2 text-gray-900">
            {/* <Lock className="w-4 h-4" /> */}
            <span className="font-semibold">{profile.user.given_name}</span>
            {/* <ChevronDown className="w-4 h-4 text-gray-500" /> */}
          </div>
          <Menu className="w-6 h-6" />
        </div>

        {/* Profile header */}
        <div className="px-4 pb-4">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="p-[3px] rounded-full bg-gradient-to-tr from-pink-500 to-yellow-400">
                <div className="w-24 h-24 rounded-full bg-white p-[3px]">
                  <img
                    src={profile.user.picture}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-3 gap-2 self-center">
              <Stat
                value={profile.posts.length.toString() || "0"}
                label="Posts"
              />
              <Stat
                value={profile.followers.length.toString() || "0"}
                label="Followers"
              />
              <Stat
                value={profile.followings.length.toString() || "0"}
                label="Following"
              />
            </div>
          </div>

          {/* Name + Bio */}
          <div className="mt-3">
            <div className="font-semibold">{profile.user.name}</div>
            {/* <p className="text-sm text-gray-700 leading-snug">
              Digital goodies designer{" "}
              <a href="#" className="text-blue-600">
                @pixsellz
              </a>
              <br />
              Everything is designed.
            </p> */}
          </div>

          {/* Edit Profile */}
          {/* <button className="mt-3 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium hover:bg-gray-50">
            Edit Profile
          </button> */}

          {/* Highlights */}
          {/* <div className="mt-4 flex items-center gap-6 overflow-x-auto pb-2">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center text-gray-500">
                <span className="text-3xl leading-none">＋</span>
              </div>
              <span className="text-xs text-gray-700">New</span>
            </div>
            {highlights.map((h) => (
              <Highlight key={h.label} {...h} />
            ))}
          </div> */}
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          {/* <div className="flex items-center justify-center gap-14 py-2">
            <Grid3X3 className="w-6 h-6" />
            <User2 className="w-6 h-6 text-gray-400" />
          </div> */}

          {/* Grid */}
          <div className="grid grid-cols-3 gap-[2px] bg-gray-100">
            {profile.posts.map((post, idx) => (
              <div
                key={idx}
                className="aspect-square bg-gray-200 overflow-hidden"
              >
                <img
                  src={post.file_storage_link}
                  alt={`post-${idx}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
      </div>
      <div className="sticky bottom-0">
        <div className="flex items-center justify-between px-8 py-3 bg-white">
          <Home className="w-7 h-7" />
          <Search className="w-7 h-7" />
          <PlusSquare className="w-7 h-7" />
          <Heart className="w-7 h-7" />
          <div className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-gray-200">
            <img
              src={profile.user.picture}
              alt="me"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
