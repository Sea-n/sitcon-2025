"use client";
import data from "@/app/(website)/_data/agenda.json";
import SessionCard from "@/app/(website)/(pages)/_components/SessionCard";
import timeRender from "@/app/(website)/_utils/time-render";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function MobileAgenda() {
  const [room, setRoom] = useState("R0");
  const direction = useRef(0);

  const handleRoomChange = (newRoom: string) => {
    const currentIndex = data.rooms.findIndex((r) => r.id === room);
    const newIndex = data.rooms.findIndex((r) => r.id === newRoom);
    direction.current = newIndex > currentIndex ? 1 : -1;
    setRoom(newRoom);
  };
  return (
    <div className="text-white">
      {/* Tab Switch Start */}
      <motion.div className="flex shadow-2xl shadow-indigo-500/40" layout>
        {data.rooms.map((rooms, index) => (
          <motion.button
            key={index}
            className="relative basis-1/5 text-center"
            onClick={() => handleRoomChange(rooms.id)}
            layout
          >
            {room === rooms.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-white"
                layoutId="underline"
              />
            )}
            {rooms.id}
          </motion.button>
        ))}
      </motion.div>
      {/* Tab Switch End */}
      {/* Tab Content Start*/}
      <AnimatePresence mode="wait">
        <motion.div
          key={room}
          initial={{ opacity: 0, x: direction.current === 1 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction.current === 1 ? -100 : 100 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {data.sessions
            .filter(
              (session) =>
                session.room === room || session.broadcast?.includes(room),
            )
            .map((session) => (
              <React.Fragment key={session.id}>
                <div
                  className="flex h-[1px] w-full items-center text-white drop-shadow-2xl"
                  style={{
                    gridColumn: "start / end",
                    gridRow: `timeLine-${session.start} / ${session.end}`,
                  }}
                >
                  <p>
                    {session.broadcast || session.room === room
                      ? timeRender(session.start)
                      : ""}
                  </p>
                  <div className="ml-6 h-[1px] w-full bg-white"></div>
                </div>
                <div className="my-4 ml-16">
                  {session.broadcast ? (
                    <SessionCard key={session.id} session={session} />
                  ) : (
                    session.room === room && (
                      <SessionCard key={session.id} session={session} />
                    )
                  )}
                </div>
              </React.Fragment>
            ))}
        </motion.div>
      </AnimatePresence>
      {/* Tab Content End*/}
    </div>
  );
}
