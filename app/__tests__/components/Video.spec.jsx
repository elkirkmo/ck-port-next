import '@testing-library/jest-dom';
import { render, screen, wait } from '@testing-library/react';
import VideoBG from '../../components/Video';
const originalEnv = process.env;

describe('Video Component', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env = {
      ...originalEnv,
      BG_VIDEO_ARRAY: ['christmas-lights', 'christmas-lights'],
    };
  });
  it('renders a heading', async () => {
    jest.mock('@vercel/blob', () => ({
      list: jest.fn(),
    }));

    list().mockReturnValue({
      blobs: [
        {
          url: 'https://oi8h7pz8fanposx0.public.blob.vercel-storage.com/christmas-lights-IDqdAk5hA9UME9CGoKpWF1uS6xCswq.mp4',
          downloadUrl:
            'https://oi8h7pz8fanposx0.public.blob.vercel-storage.com/christmas-lights-IDqdAk5hA9UME9CGoKpWF1uS6xCswq.mp4?download=1',
          pathname: 'christmas-lights.mp4',
          size: 22558152,
          uploadedAt: '2024-06-05T20:43:47.238Z',
        },
        {
          url: 'https://oi8h7pz8fanposx0.public.blob.vercel-storage.com/christmas-lights-gSqDJtXMEzQ3yTKsOUxImyRaWNHcsx.webm',
          downloadUrl:
            'https://oi8h7pz8fanposx0.public.blob.vercel-storage.com/christmas-lights-gSqDJtXMEzQ3yTKsOUxImyRaWNHcsx.webm?download=1',
          pathname: 'christmas-lights.webm',
          size: 20412128,
          uploadedAt: '2024-06-05T20:43:46.370Z',
        },
      ],
    });
    render(<VideoBG />);

    const suspense = screen.queryByText('Loading video...');

    expect(suspense).toBeInTheDocument();
    // expect(description).toBeInTheDocument();
  });
});
