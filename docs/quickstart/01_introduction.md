Quickstart
==========

A normal Splitgraph installation consists of two components: the
Splitgraph engine and the Splitgraph client.

The engine is a Docker container with a customized version of PostgreSQL
running on it. This is where cached images are stored.

The client is a Python commandline tool that interacts with the engine.

Most functionality is implemented in the client and to any other
application, the engine is just another PostgreSQL database: it can
interact with it by querying tables and writing to them as usual.

To run this demo, you will need to either be able to run Docker (to use
the official Splitgraph engine) or have access to a PostgreSQL (&gt;
9.6) database (in which case some functionality won't be available).

