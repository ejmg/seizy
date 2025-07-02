import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Calendar } from "~/components/ui/calendar"

export function Dashboard () {
  return (
    <main className="flex">
      <div className="flex-1 flex flex-col min-h-0 px-2">
        <header className="min-h-9 h-20 w-full">
          <nav className="flex justify-start items-center py-2 px-3 h-full text-primary-foreground">
            <div className="flex items-center mr-auto text-xl gap-2">
              <Avatar>
                <AvatarImage src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:dsbpb3w7glnyddtbewg73g74/bafkreifylne5jo23smxx2qfihcfetoscrm4sbdl7u4xzrd2rwv26zt6bau@jpeg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>$USER</p>
            </div>
            <div className="flex gap-4 text-lg pr-2">
              <div className="border rounded-full py-2 px-4">
                <p>Dashboard</p>
              </div>
              <div className="py-2 px-4">
                <p>Calendar</p>
              </div>
              <div className="py-2 px-4">
                <p>Logs</p>
              </div>
            </div>
          </nav>
        </header>
        <div className="flex rounded-2xl bg-zinc-200 w-full h-full px-12 py-8">
          <div className="flex flex-col w-2/3 gap-4">
            <h1 className="text-3xl font-bold">Hello, $USER</h1>
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <div className="flex flex-col gap-2 w-5/6">
                <div className="flex gap-10 bg-secondary border rounded-xl px-12 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:dsbpb3w7glnyddtbewg73g74/bafkreid4pb6wlx7pzq4coldz4tdg2jv5x2uzods6yi7m7ha4iwb5ngwzta@jpeg" />
                      <AvatarFallback>Pet</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">Pius</p>
                  </div>
                  <div >
                    lorem ipsum you dumb fuck
                  </div>
                </div>
                <div className="flex gap-10 bg-secondary border rounded-xl px-12 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:dsbpb3w7glnyddtbewg73g74/bafkreiesz7ryrhsma6edxeyv5t3togazupwtvthuquqqcxxv3kpwiz3oeq@jpeg" />
                      <AvatarFallback>Pet</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">Adelita</p>
                  </div>
                  <div >
                    lorem ipsum you dumb fuck
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-1/3">
            <h2 className="text-2xl font-semibold">Calendar</h2>
            <Calendar className="w-full rounded-xl" today={undefined}/>
            <div className="flex flex-col gap-4 mt-auto mb-28">
              <h2 className="text-2xl font-semibold">Upcoming</h2>
                <div className="flex gap-4 bg-pink-50 border rounded-xl p-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:dsbpb3w7glnyddtbewg73g74/bafkreid4pb6wlx7pzq4coldz4tdg2jv5x2uzods6yi7m7ha4iwb5ngwzta@jpeg" />
                      <AvatarFallback>Pet</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">Pius</p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-semibold">event</p>
                    <p>date</p>
                  </div>
                </div>
                <div className="flex justify-start gap-4 bg-purple-100 border rounded-xl p-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-14 w-14">
                      <AvatarImage src="https://cdn.bsky.app/img/feed_fullsize/plain/did:plc:dsbpb3w7glnyddtbewg73g74/bafkreiesz7ryrhsma6edxeyv5t3togazupwtvthuquqqcxxv3kpwiz3oeq@jpeg" />
                      <AvatarFallback>Pet</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">Adelita</p>
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-semibold">event</p>
                    <p>date</p>
                  </div>
                </div>
                <div className="bg-indigo-900 border rounded-full py-2 px-4">
                  <p className="text-primary-foreground text-center">Quick Schedule</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

