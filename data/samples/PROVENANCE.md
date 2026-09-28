# PositionReport sample provenance

- **Task:** `TASK-SEA-R2-B10-001` / B-10.
- **Origin:** Synthetic. This object was constructed for local B-11 transformer development; it was not copied from AISStream documentation and was not received from a live AISStream connection.
- **Artifact creation date:** `2026-09-23` (UTC; day precision; exact time not recorded).
- **Timestamp inside sample:** `MetaData.time_utc` is synthetic fixture data, not an observation time.
- **Source/schema reference:** the field names and expected envelope follow the approved PositionReport field contract in `SPRINT-02.md` Part A and B-10/B-11 entries. No provider payload or external documentation example is claimed as the source of these values.
- **Intended region context:** coordinates `(51.0, 1.45)` are within the configured Dover bounds `[[50.75, 0.95], [51.25, 1.95]]`. This is fixture context only and does not indicate a vessel was present there.
- **Fields and normalization:** the sample contains `MetaData.MMSI`, `ShipName`, `latitude`, `longitude`, `time_utc`, and `Message.PositionReport.Sog`, `Cog`, `TrueHeading`, `Latitude`, `Longitude` with the agreed casing. No fields were omitted or normalized.
- **Sanitization:** the MMSI and vessel name are synthetic placeholders; the sample contains no API key, credential, access token, private path, or unrelated personal data.
- **Limitations:** this fixture tests only the agreed input shape and chosen synthetic values. It proves no live observation, vessel identity, AISStream availability, provider field semantics beyond the recorded contract, traffic completeness, or R2 user-story acceptance. Do not describe it as live or documentation-derived data.