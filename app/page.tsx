import { existsSync } from "node:fs";
import path from "node:path";
import Portrait from "./components/Portrait";
import RunSheet from "./components/RunSheet";
import ThemeToggle from "./components/ThemeToggle";
import { education, experience, principles, profile, projects, skills, stats } from "./data";

// Drop your CV as public/Joshua-Ortiz-CV.pdf and the download button appears on the next build.
const CV_FILE = "Joshua-Ortiz-CV.pdf";
const hasCv = existsSync(path.join(process.cwd(), "public", CV_FILE));

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="nav-name">
            {profile.name}
          </a>
          <a href="#work">Work</a>
          <a href="#how">How I work</a>
          <a href="#experience">Experience</a>
          <a href="#contact" className="nav-cta">
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>

      <main id="top">
        <header className="band">
          <div className="wrap hero">
            <div className="hero-text">
              <p className="hero-role">{profile.role}</p>
              <h1>{profile.name}</h1>
              <p className="lead">{profile.pitch}</p>
              <div className="btns">
                <a className="btn btn-main" href="#work">
                  See my work
                </a>
                {hasCv && (
                  <a className="btn" href={`/${CV_FILE}`}>
                    Download CV
                  </a>
                )}
                <a className="btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="btn" href={profile.links.upwork} target="_blank" rel="noreferrer">
                  Upwork
                </a>
              </div>
              <ul className="facts">
                <li>{profile.location}</li>
                <li>{profile.languages}</li>
              </ul>
            </div>
            <div className="hero-visual">
              <Portrait name={profile.name} status={profile.availability} />
              <div className="hero-sheet">
                <RunSheet />
              </div>
            </div>
          </div>
        </header>

        <section className="stats" aria-label="Key numbers">
          <div className="wrap stats-grid">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="band band-alt" id="work">
          <div className="wrap">
            <h2>Selected work</h2>
            <p className="lead">
              Built at Teker, a telehealth company in Colombia, where I run process automation and support and work with the
              development team.
            </p>
            <div className="projects">
              {projects.map((p) => (
                <article className="project" key={p.slug} id={p.slug}>
                  <div className="project-head">
                    <h3>{p.title}</h3>
                    <div className="metric">
                      <strong>{p.metric.value}</strong>
                      <span>{p.metric.label}</span>
                    </div>
                  </div>
                  <div className="project-body">
                    <div>
                      <h4>Problem</h4>
                      <p>{p.problem}</p>
                      <h4>Result</h4>
                      <p>{p.result}</p>
                    </div>
                    <div>
                      <h4>Approach</h4>
                      <ul>
                        {p.approach.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <ul className="tags" aria-label="Stack">
                    {p.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="how">
          <div className="wrap">
            <h2>How I work</h2>
            <p className="lead">Every tool I ship has to prove its own output. These rules came from real failures.</p>
            <div className="rules">
              {principles.map((r) => (
                <div className="rule" key={r.title}>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-alt" id="experience">
          <div className="wrap xp">
            <div>
              <h2>Experience</h2>
              <ol className="jobs">
                {experience.map((j) => (
                  <li className="job" key={j.org}>
                    <div className="job-when">{j.period}</div>
                    <div>
                      <h3>{j.role}</h3>
                      <div className="job-org">{j.org}</div>
                      <ul>
                        {j.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <aside>
              <h2 className="h2-small">Skills</h2>
              {skills.map((g) => (
                <div className="skill-group" key={g.group}>
                  <h3>{g.group}</h3>
                  <ul className="chips">
                    {g.items.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
              <h2 className="h2-small">Education</h2>
              <ul className="edu">
                {education.map((e) => (
                  <li key={e.org}>
                    <strong>{e.org}</strong> <span>{e.detail}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="band contact" id="contact">
          <div className="wrap">
            <h2>Have a process your team still does by hand?</h2>
            <p className="lead">
              Tell me what it is. I&apos;ll tell you straight what can be automated, how reliable it will be and roughly how long it
              takes.
            </p>
            <div className="btns">
              <a className="btn btn-accent" href={profile.links.upwork} target="_blank" rel="noreferrer">
                Hire me on Upwork
              </a>
              <a className="btn btn-light" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                Message me on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          © {new Date().getFullYear()} {profile.name}. Figures come from my own work; no client or patient data is published.
        </div>
      </footer>
    </>
  );
}
