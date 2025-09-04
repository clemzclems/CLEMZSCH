import cv2
import os

def images_to_video(input_dir, output_file, fps):
    images = sorted(os.listdir(input_dir))
    frame_array = []

    for image in images:
        if image.endswith(".jpg") or image.endswith(".png"):
            img_path = os.path.join(input_dir, image)
            img = cv2.imread(img_path)
            height, width, _ = img.shape
            size = (width, height)
            frame_array.append(img)

    out = cv2.VideoWriter(output_file, cv2.VideoWriter_fourcc(*'mp4v'), fps, size)

    for frame in frame_array:
        out.write(frame)
    out.release()

    print("✅ Video saved as:", output_file)

if __name__ == "__main__":
    input_dir = "/sdcard/DCIM/AquaClip/video2image_1756695847195"
    output_file = "/sdcard/DCIM/rebuilt.mp4"
    fps = 25
    images_to_video(input_dir, output_file, fps)
