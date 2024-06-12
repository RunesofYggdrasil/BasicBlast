"use client";

import React from "react";
import { handleUploadSequence } from "@/lib/actions";
import styles from "./UploadForm.module.css";
import ReactTextareaAutosize from "react-textarea-autosize";

const UploadForm = () => {
  return (
    <div className={styles.uploadDiv}>
      <form className={styles.uploadForm} action={handleUploadSequence}>
        <label className={styles.uploadLabel} htmlFor="name">
          Name:{" "}
        </label>
        <input
          type="text"
          id="name"
          className={styles.uploadInput}
          name="name"
          placeholder="Input Name Here"
          required
        />
        <label className={styles.uploadLabel} htmlFor="species">
          Species:{" "}
        </label>
        <input
          type="text"
          id="species"
          className={styles.uploadInput}
          name="species"
          placeholder="Input Species Here"
          required
        />
        <label className={styles.uploadLabel} htmlFor="brief">
          Brief:{" "}
        </label>
        <input
          type="text"
          id="brief"
          className={styles.uploadInput}
          name="brief"
          placeholder="Input Brief Here"
        />
        <label className={styles.uploadLabel} htmlFor="description">
          Description:{" "}
        </label>
        <input
          type="text"
          id="description"
          className={styles.uploadInput}
          name="description"
          placeholder="Input Description Here"
          required
        />
        <label className={styles.uploadLabel} htmlFor="sequence">
          Sequence:{" "}
        </label>
        <ReactTextareaAutosize
          id="sequence"
          className={styles.uploadSequence}
          name="sequence"
          placeholder="Input Sequence Here"
          required
        />
        <input
          type="submit"
          className={styles.uploadSubmit}
          value="UPLOAD SEQUENCE"
        />
      </form>
    </div>
  );
};

export default UploadForm;
